import db from '../config/db'

export const getAllJobs = (callback: Function) => {
    db.query('SELECT * FROM jobs', callback);
};

export const getJobById = (id: number, callback: Function) => {
    db.query('SELECT * FROM jobs WHERE id = ?', [id], callback);
};

export const createJob = (job: any, callback: Function) => {
    db.query('INSERT INTO jobs SET ?', job, callback);
};

export const updateJob = (id: number, job: any, callback: Function) => {
    db.query('UPDATE jobs SET ? WHERE id = ?', [job, id], callback);
};

export const deleteJob = (id: number, callback: Function) => {
    db.query('DELETE FROM jobs WHERE id = ?', [id], callback);
};
