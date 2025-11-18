import express, { Request, Response } from 'express'
import transporter from '../config/emailConfig';
import { User } from '../models/userModel';

export const sendEmailWithOtp = async (req: Request, res: Response) => {

    const { email } = req.body;

    console.log(email);

    if (!email) {
        res.status(400).json({ message: 'Email not provided!', data: null });
        return;
    }

    const user = await User.findOne({email: email});
    console.log(user);
    if(user == null){
        res.status(404).json({ message: 'User not found!', data: null });
        return;
    }

    function generate6DigitCode() {
        return Math.floor(100000 + Math.random() * 900000);
    }

    const code = generate6DigitCode();

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        replyTo: email,  
        subject: 'Tick Tick - one time password (OTP)',
        text: `Use this otp to change your password`,
        html: `
            <h3>OTP</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>otp:</strong></p>
            <p>${code}</p>
            `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!', data: code });
    }
    catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ message: 'Failed to send email', data: null });
    }
}