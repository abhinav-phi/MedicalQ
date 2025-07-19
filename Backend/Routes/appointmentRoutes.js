const express = require('express');
const router = express.Router();
const { verifyToken } = require('../Middlewares/Auth');

// Mock appointment controller functions
const AppointmentController = {
  // Create new appointment
  async createAppointment(req, res) {
    try {
      const {
        doctorId,
        appointmentDate,
        appointmentTime,
        appointmentType,
        reason,
        symptoms,
        duration,
        patientName,
        patientPhone,
        patientEmail,
        emergencyContact,
        medicalHistory,
        currentMedications,
        insuranceProvider,
        insuranceNumber,
        preferredLanguage,
        specialRequests,
        appointmentDateTime
      } = req.body;

      // Validate required fields
      if (!appointmentDate || !appointmentTime || !reason) {
        return res.status(400).json({
          success: false,
          message: 'Appointment date, time, and reason are required'
        });
      }

      // Create appointment object (in real app, save to database)
      const appointment = {
        id: Date.now().toString(),
        patientId: req.user.id,
        doctorId: doctorId || 'default-doctor',
        appointmentDate,
        appointmentTime,
        appointmentDateTime,
        appointmentType: appointmentType || 'consultation',
        reason,
        symptoms,
        duration: duration || 30,
        patientName: patientName || req.user.name,
        patientPhone,
        patientEmail: patientEmail || req.user.email,
        emergencyContact,
        medicalHistory,
        currentMedications,
        insuranceProvider,
        insuranceNumber,
        preferredLanguage: preferredLanguage || 'English',
        specialRequests,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // In a real application, you would save this to your database
      console.log('New appointment created:', appointment);

      res.status(201).json({
        success: true,
        message: 'Appointment booked successfully',
        data: {
          appointment
        }
      });

    } catch (error) {
      console.error('Create appointment error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error while booking appointment'
      });
    }
  },

  // Get user appointments
  async getUserAppointments(req, res) {
    try {
      const { status, limit = 10, page = 1 } = req.query;

      // Mock appointments data
      const mockAppointments = [
        {
          id: '1',
          patientId: req.user.id,
          doctorId: 'doc1',
          doctorName: 'Dr. Rajesh Kumar',
          doctorSpecialty: 'Cardiology',
          appointmentDate: '2025-01-20',
          appointmentTime: '10:00',
          appointmentType: 'consultation',
          reason: 'Regular checkup',
          status: 'confirmed',
          createdAt: '2025-01-15T10:00:00Z'
        },
        {
          id: '2',
          patientId: req.user.id,
          doctorId: 'doc2',
          doctorName: 'Dr. Meera Gupta',
          doctorSpecialty: 'Oncology',
          appointmentDate: '2025-01-25',
          appointmentTime: '14:30',
          appointmentType: 'follow-up',
          reason: 'Follow-up consultation',
          status: 'pending',
          createdAt: '2025-01-14T15:30:00Z'
        }
      ];

      let filteredAppointments = mockAppointments;

      // Filter by status if provided
      if (status && status !== 'all') {
        filteredAppointments = mockAppointments.filter(apt => apt.status === status);
      }

      // Apply pagination
      const startIndex = (parseInt(page) - 1) * parseInt(limit);
      const endIndex = startIndex + parseInt(limit);
      const paginatedAppointments = filteredAppointments.slice(startIndex, endIndex);

      res.json({
        success: true,
        data: {
          appointments: paginatedAppointments,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(filteredAppointments.length / parseInt(limit)),
            totalAppointments: filteredAppointments.length,
            hasNext: endIndex < filteredAppointments.length,
            hasPrev: startIndex > 0
          }
        }
      });

    } catch (error) {
      console.error('Get appointments error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching appointments'
      });
    }
  },

  // Update appointment
  async updateAppointment(req, res) {
    try {
      const { appointmentId } = req.params;
      const { status, notes } = req.body;

      // In real app, update in database
      const updatedAppointment = {
        id: appointmentId,
        status: status || 'pending',
        notes: notes || '',
        updatedAt: new Date().toISOString()
      };

      console.log('Appointment updated:', updatedAppointment);

      res.json({
        success: true,
        message: 'Appointment updated successfully',
        data: {
          appointment: updatedAppointment
        }
      });

    } catch (error) {
      console.error('Update appointment error:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating appointment'
      });
    }
  },

  // Cancel appointment
  async cancelAppointment(req, res) {
    try {
      const { appointmentId } = req.params;
      const { reason } = req.body;

      // In real app, update status in database
      console.log(`Appointment ${appointmentId} cancelled. Reason: ${reason}`);

      res.json({
        success: true,
        message: 'Appointment cancelled successfully'
      });

    } catch (error) {
      console.error('Cancel appointment error:', error);
      res.status(500).json({
        success: false,
        message: 'Error cancelling appointment'
      });
    }
  }
};

// Routes
router.post('/', verifyToken, AppointmentController.createAppointment);
router.get('/', verifyToken, AppointmentController.getUserAppointments);
router.put('/:appointmentId', verifyToken, AppointmentController.updateAppointment);
router.delete('/:appointmentId', verifyToken, AppointmentController.cancelAppointment);

module.exports = router;