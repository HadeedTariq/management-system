import otpGenerator from "otp-generator";
import { env } from "@/common/utils/envConfig";
import nodemailer from "nodemailer";
import { sign } from "jsonwebtoken";
import { logger } from "@/common/middleware/requestLogger";
import { users } from "@/db";

export function generateOTP() {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
    digits: true,
  });

  return otp;
}

export const sendOTPEmail = async (
  to: string,
  otp: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: String(env.NODE_MAILER_USER),
        pass: String(env.NODE_MAILER_PASSWORD),
      },
    });

    const mailOptions = {
      from: `"CiviConnect" <${env.NODE_MAILER_USER}>`,
      to,
      subject: "Verify Your CiviConnect Account – OTP Inside",
      html: `
    <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f6f9f8; padding: 30px 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e5e7eb;">
        
        <!-- Header -->
        <div style="background-color: #4A7C65; padding: 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 0.5px;">
            CiviConnect
          </h1>
          <p style="color: #d1e7dd; margin: 4px 0 0; font-size: 13px;">
            College Society Management Platform
          </p>
        </div>

        <!-- Body -->
        <div style="padding: 24px;">
          <h2 style="color: #1f2937; font-size: 18px; margin-bottom: 12px;">
            Verify Your Account
          </h2>

          <p style="font-size: 15px; color: #374151; line-height: 1.6;">
            To continue setting up your account on <strong>CiviConnect</strong>, please use the One-Time Password (OTP) below:
          </p>

          <!-- OTP Box -->
          <div style="text-align: center; margin: 24px 0;">
            <span style="
              display: inline-block;
              background: #f0f7f4;
              color: #4A7C65;
              font-size: 30px;
              font-weight: bold;
              letter-spacing: 6px;
              padding: 14px 24px;
              border-radius: 8px;
              border: 1px dashed #4A7C65;
            ">
              ${otp}
            </span>
          </div>

          <p style="font-size: 14px; color: #6b7280;">
            This code is valid for <strong>5 minutes</strong>. For your security, do not share this code with anyone.
          </p>

          <p style="font-size: 14px; color: #6b7280;">
            If you did not request this verification, you can safely ignore this email.
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #9ca3af; margin: 0;">
            © ${new Date().getFullYear()} CiviConnect. All rights reserved.
          </p>
          <p style="font-size: 12px; color: #9ca3af; margin: 4px 0 0;">
            Empowering student societies & campus collaboration
          </p>
        </div>

      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    logger.error({
      event: "email_otp_sending_failed",
      error: error?.message,
      code: error.code,
      metadata: { email: to },
    });

    return { success: false, error: error.message || "Email sending failed" };
  }
};

export const sendResetPasswordEmail = async (
  to: string,
  url: string,
): Promise<{ success: boolean; error?: string }> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: String(env.NODE_MAILER_USER),
        pass: String(env.NODE_MAILER_PASSWORD),
      },
    });

    const mailOptions = {
      from: `"React Starter Kit" <${env.NODE_MAILER_USER}>`,
      to,
      subject: "Reset Your React Starter Kit Password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #eaeaea; border-radius: 8px;">
          
          <h2 style="color: #2c3e50; margin-bottom: 8px;">
            Password Reset Request
          </h2>

          <p style="font-size: 16px; color: #333;">
            We received a request to reset the password for your
            <strong>React Starter Kit</strong> account.
          </p>

          <p style="font-size: 16px; color: #333;">
            Click the button below to reset your password. This link is
            <strong>valid for a limited time</strong> and can only be used once.
          </p>

          <div style="text-align: center; margin: 32px 0;">
            <a
              href="${url}"
              style="
                background-color: #0070f3;
                color: #ffffff;
                padding: 14px 28px;
                text-decoration: none;
                border-radius: 6px;
                font-size: 16px;
                font-weight: bold;
                display: inline-block;
              "
            >
              Reset Password
            </a>
          </div>

          <p style="font-size: 14px; color: #666;">
            If the button doesn’t work, copy and paste this link into your browser:
          </p>

          <p style="font-size: 14px; color: #0070f3; word-break: break-all;">
            ${url}
          </p>

          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />

          <p style="font-size: 13px; color: #999;">
            If you did not request a password reset, you can safely ignore this
            email. Your password will remain unchanged.
          </p>

          <p style="font-size: 12px; color: #999;">
            — The React Starter Kit Team
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: any) {
    logger.error({
      event: "password_reset_email_failed",
      error: error?.message,
      code: error?.code,
      metadata: { email: to },
    });

    return {
      success: false,
      error: error?.message || "Failed to send reset password email",
    };
  }
};

export const generateAccessAndRefreshToken = function (user: any) {
  const refreshToken = sign({ id: user.id }, env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "15d",
  });
  const accessToken = sign(
    {
      id: user.id,
      user_name: user.userName || "",
      email: user.email || "",
      role: user.role || "customer",
      gender: user.gender || "male",
    },
    env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" },
  );

  return { refreshToken, accessToken };
};
