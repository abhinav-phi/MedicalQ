const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const validator = require('validator');
const Newsletter = require('./Models/Newsletter');

// Email configuration (add to your environment variables)
const authRoutes = require('./Routes/authRoutes');
const appointmentRoutes = require('./Routes/appointmentRoutes');
const searchRoutes = require('./Routes/searchRoutes');
const { errorHandler, notFound } = require('./Middlewares/Error');

// Mongoose models
const Credential = require('./Models/Credential');
const DoctorProfile = require('./Models/DoctorProfile');
const PatientProfile = require('./Models/PatientProfile');
const Message = require('./Models/Message');

const app = express();
app.set('trust proxy', 1);

// security headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    crossOriginEmbedderPolicy: false,
}));

// RS setup
const corsOptions = {
    origin(origin, callback) {
        const allowed = ['http://localhost:5173', 'http://localhost:3001', 'https://medicalq.vercel.app', 'https://medical20-hazel.vercel.app'];
        if (!origin) return callback(null, true); // Allow non-browser clients
        if (allowed.includes(origin)) return callback(null, true);
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// rate limiting
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { success: false, message: 'Too many requests, try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
}));

// middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(compression());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp({ whitelist: ['specialization', 'role'] }));
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// health check
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
    });
});

// rate limiter for auth
app.use('/api/auth', rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    skipSuccessfulRequests: true,
    message: { success: false, message: 'Too many auth attempts, try again later.' },
}), authRoutes);

// API Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/search', searchRoutes);

// Doctor registration
app.post('/form/doctors', async (req, res) => {
    const { name, age, specialty, authentication_token, username, password } = req.body;
    try {
        const existing = await Credential.findOne({ username });
        if (existing) return res.json({ result: false, message: "Username already exists" });

        await Credential.create({ username, password });
        await DoctorProfile.create({ name, age, specialty, authentication_token, username, community: "general" });

        res.json({ result: true, message: "Doctor registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error during doctor registration");
    }
});

// Patient registration
app.post('/form/patients', async (req, res) => {
    const { name, age, disease, username, password } = req.body;
    try {
        const existing = await Credential.findOne({ username });
        if (existing) return res.json({ result: false, message: "Username already exists" });

        await Credential.create({ username, password });
        await PatientProfile.create({ name, age, disease, username, community: "general" });

        res.json({ result: true, message: "Patient registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error during patient registration");
    }
});

// Sign-in
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Credential.findOne({ username, password });
        if (!user) return res.status(401).json({ result: false, message: "Invalid credentials" });
        res.json({ result: true, message: "Sign in successful", user });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error during sign in");
    }
});

// Send message
app.post('/askquestion', async (req, res) => {
    const { message, sender, community } = req.body;
    try {
        const result = await Message.create({
            message, sender, community, type: "question", answers: [], time: new Date().toISOString()
        });
        res.json({ message: "Message sent successfully", result });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting message");
    }
});

// Get messages for a community
app.post('/messagebox', async (req, res) => {
    const { community } = req.body;
    try {
        const messages = await Message.find({ community });
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching messages");
    }
});

// Submit answer
app.post('/answer', async (req, res) => {
    const { message_id, answer, doctor_username } = req.body;
    try {
        const message = await Message.findOne({ time: message_id });
        if (!message) return res.status(404).json({ result: false, message: "Message not found" });

        const newAnswer = { answer, doctor_username, time: new Date().toISOString() };
        message.answers.push(newAnswer);
        await message.save();

        res.json({ message: "Answer submitted successfully", result: newAnswer });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting answer");
    }
});

// Get doctor profiles
app.post('/getprofiles', async (req, res) => {
    const { username } = req.body;
    try {
        const profiles = await DoctorProfile.find({ username });
        res.json(profiles);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching profiles");
    }
});

const emailConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER, // Your email
        pass: process.env.SMTP_PASS  // Your email password or app password
    }
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Verify email configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Email configuration error:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

// Newsletter subscription endpoint
app.post('/api/newsletter/subscribe', async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Check if email already exists
        const existingSubscriber = await Newsletter.findOne({ email });
        if (existingSubscriber) {
            if (existingSubscriber.isActive) {
                return res.status(400).json({
                    success: false,
                    message: 'This email is already subscribed to our newsletter'
                });
            } else {
                // Reactivate subscription
                existingSubscriber.isActive = true;
                existingSubscriber.subscribedAt = new Date();
                await existingSubscriber.save();
                
                // Send welcome back email
                await sendWelcomeEmail(email, false);
                
                return res.json({
                    success: true,
                    message: 'Welcome back! Your subscription has been reactivated.'
                });
            }
        }

        // Create new subscription
        const newSubscriber = await Newsletter.create({
            email,
            isActive: true,
            subscribedAt: new Date()
        });

        // Send welcome email
        await sendWelcomeEmail(email, true);

        res.json({
            success: true,
            message: 'Successfully subscribed to MedicalQ newsletter! Check your email for confirmation.'
        });

    } catch (error) {
        console.error('Newsletter subscription error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing your subscription'
        });
    }
});

// Unsubscribe endpoint
app.post('/api/newsletter/unsubscribe', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        const subscriber = await Newsletter.findOneAndUpdate(
            { email },
            { isActive: false, unsubscribedAt: new Date() },
            { new: true }
        );

        if (!subscriber) {
            return res.status(404).json({
                success: false,
                message: 'Email not found in our subscription list'
            });
        }

        res.json({
            success: true,
            message: 'Successfully unsubscribed from MedicalQ newsletter'
        });

    } catch (error) {
        console.error('Newsletter unsubscription error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing your unsubscription'
        });
    }
});

// Get newsletter statistics (admin only)
app.get('/api/newsletter/stats', async (req, res) => {
    try {
        const totalSubscribers = await Newsletter.countDocuments({ isActive: true });
        const totalUnsubscribed = await Newsletter.countDocuments({ isActive: false });
        const recentSubscribers = await Newsletter.find({ isActive: true })
            .sort({ subscribedAt: -1 })
            .limit(10)
            .select('email subscribedAt');

        res.json({
            success: true,
            data: {
                totalSubscribers,
                totalUnsubscribed,
                recentSubscribers
            }
        });

    } catch (error) {
        console.error('Newsletter stats error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching newsletter statistics'
        });
    }
});

// Send newsletter to all subscribers
app.post('/api/newsletter/send', async (req, res) => {
    try {
        const { subject, content, isHTML = true } = req.body;

        if (!subject || !content) {
            return res.status(400).json({
                success: false,
                message: 'Subject and content are required'
            });
        }

        // Get all active subscribers
        const subscribers = await Newsletter.find({ isActive: true }).select('email');
        
        if (subscribers.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No active subscribers found'
            });
        }

        // Send emails in batches to avoid overwhelming the server
        const batchSize = 50;
        let successCount = 0;
        let failureCount = 0;

        for (let i = 0; i < subscribers.length; i += batchSize) {
            const batch = subscribers.slice(i, i + batchSize);
            const emailPromises = batch.map(async (subscriber) => {
                try {
                    await sendNewsletterEmail(subscriber.email, subject, content, isHTML);
                    successCount++;
                } catch (error) {
                    console.error(`Failed to send email to ${subscriber.email}:`, error);
                    failureCount++;
                }
            });

            await Promise.all(emailPromises);
            
            // Add delay between batches
            if (i + batchSize < subscribers.length) {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        res.json({
            success: true,
            message: `Newsletter sent successfully. ${successCount} emails sent, ${failureCount} failed.`,
            data: {
                totalSubscribers: subscribers.length,
                successCount,
                failureCount
            }
        });

    } catch (error) {
        console.error('Newsletter send error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while sending the newsletter'
        });
    }
});

// Helper function to send welcome email
async function sendWelcomeEmail(email, isNewSubscriber = true) {
    const subject = isNewSubscriber ? 
        'Welcome to MedicalQ Newsletter!' : 
        'Welcome Back to MedicalQ Newsletter!';
    
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${subject}</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                .button { display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .unsubscribe { text-align: center; margin-top: 30px; }
                .unsubscribe a { color: #666; text-decoration: none; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1> MedicalQ</h1>
                    <h2>${isNewSubscriber ? 'Welcome to Our Newsletter!' : 'Welcome Back!'}</h2>
                </div>
                <div class="content">
                    <p>Dear Subscriber,</p>
                    <p>${isNewSubscriber ? 
                        'Thank you for subscribing to the MedicalQ newsletter! We\'re excited to have you join our community.' : 
                        'Welcome back to the MedicalQ newsletter! We\'re glad to have you back in our community.'
                    }</p>
                    <p>You can expect to receive:</p>
                    <ul>
                        <li>🔬 Latest medical research and health updates</li>
                        <li>💡 Health tips and wellness advice</li>
                        <li>🏥 Hospital news and announcements</li>
                        <li>📅 Information about health events and screenings</li>
                        <li>👨‍⚕️ Expert insights from our medical professionals</li>
                    </ul>
                    <p>We're committed to providing you with valuable health information and keeping you informed about the latest developments in healthcare.</p>
                    <div style="text-align: center;">
                        <a href="https://medicalq.vercel.app" class="button">Visit Our Website</a>
                    </div>
                </div>
                <div class="footer">
                    <p>© ${new Date().getFullYear()} MedicalQ. All rights reserved.</p>
                    <p>Rajinder Nagar, New Delhi - 110060</p>
                    <div class="unsubscribe">
                        <a href="https://medicalq.vercel.app/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

    const mailOptions = {
        from: `"MedicalQ Newsletter" <${process.env.SMTP_USER}>`,
        to: email,
        subject: subject,
        html: htmlContent
    };

    await transporter.sendMail(mailOptions);
}

// Helper function to send newsletter email
async function sendNewsletterEmail(email, subject, content, isHTML = true) {
    const unsubscribeLink = `https://medicalq.vercel.app/unsubscribe?email=${encodeURIComponent(email)}`;
    
    let emailContent = content;
    if (isHTML) {
        emailContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${subject}</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                    .unsubscribe { text-align: center; margin-top: 20px; }
                    .unsubscribe a { color: #666; text-decoration: none; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🏥 MedicalQ Newsletter</h1>
                    </div>
                    <div class="content">
                        ${content}
                    </div>
                    <div class="footer">
                        <p>© ${new Date().getFullYear()} MedicalQ. All rights reserved.</p>
                        <p>Rajinder Nagar, New Delhi - 110060</p>
                        <div class="unsubscribe">
                            <a href="${unsubscribeLink}">Unsubscribe</a>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;
    } else {
        emailContent += `\n\n---\n© ${new Date().getFullYear()} MedicalQ. All rights reserved.\nUnsubscribe: ${unsubscribeLink}`;
    }

    const mailOptions = {
        from: `"MedicalQ Newsletter" <${process.env.SMTP_USER}>`,
        to: email,
        subject: subject,
        [isHTML ? 'html' : 'text']: emailContent
    };

    await transporter.sendMail(mailOptions);
}
// 404 & error handling
app.all('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;


