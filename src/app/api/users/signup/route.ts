import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

// Establish database connection
connect()

export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // Logging the request body (can be removed in production)
        console.log('Request Body:', reqBody);

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Generate a salt for hashing the password
        const salt = await bcryptjs.genSalt(10);

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Log the saved user (can be removed in production)
        console.log('Saved User:', savedUser);

        // Send verification email to the user
        await sendEmail({
            email,
            emailType: "VERIFY",
            userId: savedUser._id,
        });

        // Respond with success
        return NextResponse.json(
            {
                message: "User created successfully",
                user: savedUser,
            },
            { status: 201 }
        );

    } catch (error: any) {
        // Log the error for debugging
        console.error('Error during user registration:', error);

        // Respond with a 500 status code and error message
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
