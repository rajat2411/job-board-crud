// src/controllers/jobController.ts

import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as jobModel from '../model/jobModel'; // Ensure the path is correct

export const getJobs = (req: any, res: any) => {
    jobModel.getAllJobs((err: any, results: any) => {
        if (err) {
            console.error('Error fetching jobs:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json(results);
    });
};

export const getJob = (req: any, res: any) => {
    const { id } = req.params;

    // Check if ID is a valid number
    if (isNaN(Number(id))) {
        return res.status(400).json({ message: 'Invalid job ID format.' });
    }

    jobModel.getJobById(Number(id), (err: any, results: any) => {
        if (err) {
            console.error('Error fetching job:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Check if the job was found
        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        res.status(200).json(results[0]);
    });
};

export const createJob = (req: any, res: any) => {
    // Validate incoming data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const newJob = req.body;
    
    // Additional validation for salary
    if (newJob.salary < 0) {
        return res.status(400).json({ message: 'Salary must be a positive number.' });
    }

    jobModel.createJob(newJob, (err: any) => {
        if (err) {
            console.error('Error creating job:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'Job created successfully.' });
    });
};

export const updateJob = (req: any, res: any) => {
    const { id } = req.params;

    // Check if ID is a valid number
    if (isNaN(Number(id))) {
        return res.status(400).json({ message: 'Invalid job ID format.' });
    }

    // Validate incoming data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const updatedJob = req.body;

    // Additional validation for salary
    if (updatedJob.salary < 0) {
        return res.status(400).json({ message: 'Salary must be a positive number.' });
    }

    jobModel.updateJob(Number(id), updatedJob, (err: any) => {
        if (err) {
            console.error('Error updating job:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        
        // Check if the job was updated successfully
        if (!updatedJob) { // Assuming updateJob returns null or undefined on failure
            return res.status(404).json({ message: 'Job not found or could not be updated.' });
        }

        res.status(200).json({ message: 'Job updated successfully.' });
    });
};

export const deleteJob = (req: any, res: any) => {
    const { id } = req.params;

    // Check if ID is a valid number
    if (isNaN(Number(id))) {
        return res.status(400).json({ message: 'Invalid job ID format.' });
    }

    jobModel.deleteJob(Number(id), (err: any) => {
        if (err) {
            console.error('Error deleting job:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        
        // Assuming deleteJob returns a result indicating success or failure
        // If the result indicates that no rows were affected, it means the job was not found.
        
        // For example:
        // if (result.affectedRows === 0) { 
        //     return res.status(404).json({ message: 'Job not found or could not be deleted.' }); 
        // }
        
        res.status(200).json({ message: 'Job deleted successfully.' });
    });
};
