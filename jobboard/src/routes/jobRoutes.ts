// src/routes/jobRoutes.ts

import { Router } from 'express';
import { body } from 'express-validator';
import * as jobController from '../controllers/jobController';

const router = Router();

// Validation rules for creating and updating jobs
const jobValidationRules = [
    body('title').isString().notEmpty().withMessage('Title is required.'),
    body('company').isString().notEmpty().withMessage('Company is required.'),
    body('location').isString().notEmpty().withMessage('Location is required.'),
    body('salary').isNumeric().withMessage('Salary must be a number.'),
    body('description').isString().notEmpty().withMessage('Description is required.')
];

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management operations.
 */

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Retrieve all jobs.
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: A list of jobs.
 */
router.get('/jobs', jobController.getJobs);

/**
 * @swagger
 * /jobs/{id}:
 *   get:
 *     summary: Retrieve a job by ID.
 *     tags: [Jobs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The job ID.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single job object.
 */
router.get('/jobs/:id', jobController.getJob);

/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a new job.
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               company:
 *                 type: string
 *               location:
 *                 type: string
 *               salary:
 *                 type: number
 *               description:
 *                 type: string
 *
 *     responses:
 *       201:
 *         description: Job created successfully.
 */
router.post('/jobs', jobValidationRules, jobController.createJob);

/**
 * @swagger
 * /jobs/{id}:
 *   put:
 *     summary: Update a job by ID.
 *     tags: [Jobs]
 *
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 
 */
router.put('/jobs/:id', jobValidationRules, jobController.updateJob);

/**
* @swagger
* /jobs/{id}:
*   delete:
*     summary: Delete a job by ID.
*     tags: [Jobs]
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: The job ID.
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Job deleted successfully.
*/
router.delete('/jobs/:id', jobController.deleteJob);


export default router;
