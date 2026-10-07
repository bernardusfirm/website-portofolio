import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, budget_range, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Nama, email, dan pesan wajib diisi.' },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_EMAIL || 'bernardusfirman@gmail.com';
    const senderUser = process.env.EMAIL_USER || process.env.SMTP_USER;
    const senderPass = process.env.EMAIL_PASS || process.env.SMTP_PASS;

    let emailSent = false;
    let providerUsed = 'none';

    // 1. Coba kirim via Nodemailer (Gmail / SMTP) jika kredensial tersedia
    if (senderUser && senderPass) {
      try {
        const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
        const smtpPort = Number(process.env.SMTP_PORT) || 465;
        const isSecure = smtpPort === 465;

        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: isSecure,
          auth: {
            user: senderUser,
            pass: senderPass,
          },
        });

        const htmlContent = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; background-color: #121212; color: #ffffff; padding: 28px; border-radius: 16px; border: 1px solid #2a2a2a;">
            <div style="border-bottom: 2px solid #3682F6; padding-bottom: 16px; margin-bottom: 20px;">
              <span style="font-size: 11px; font-family: monospace; color: #3682F6; text-transform: uppercase; letter-spacing: 2px;">// BRIEF PROYEK BARU</span>
              <h2 style="color: #ffffff; margin: 6px 0 0 0; font-size: 22px;">Permintaan Desain dari Website Portofolio</h2>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; color: #888888; width: 140px; font-size: 13px;"><strong>Nama Klien</strong></td>
                <td style="padding: 10px 0; color: #ffffff; font-size: 14px; font-weight: bold;">: ${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888888; font-size: 13px;"><strong>Email Klien</strong></td>
                <td style="padding: 10px 0; color: #3682F6; font-size: 14px;">: <a href="mailto:${email}" style="color: #3682F6; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888888; font-size: 13px;"><strong>Kategori Proyek</strong></td>
                <td style="padding: 10px 0; color: #ffffff; font-size: 14px;">: ${subject || '-'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #888888; font-size: 13px;"><strong>Estimasi Budget</strong></td>
                <td style="padding: 10px 0; color: #10B981; font-size: 14px; font-weight: bold;">: ${budget_range || '-'}</td>
              </tr>
            </table>
            
            <div style="background-color: #1c1c1c; padding: 18px; border-radius: 10px; border-left: 4px solid #3682F6; margin-bottom: 24px;">
              <h4 style="margin: 0 0 10px 0; color: #a1a1aa; font-size: 12px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px;">Pesan & Detail Brief:</h4>
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap; color: #e4e4e7; font-size: 14px;">${message}</p>
            </div>
            
            <div style="text-align: center; margin-bottom: 20px;">
              <a href="mailto:${email}?subject=Re: Brief Proyek - ${encodeURIComponent(subject || 'Desain Grafis')}" style="display: inline-block; background-color: #3682F6; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 13px;">
                Balas Email Klien Langsung
              </a>
            </div>
            
            <div style="font-size: 11px; color: #71717a; border-top: 1px solid #27272a; padding-top: 16px; text-align: center; font-family: monospace;">
              Dikirim otomatis dari formulir kontak portofolio Bernardus Firman Bagaskara
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"Portofolio Brief" <${senderUser}>`,
          to: recipientEmail,
          replyTo: email,
          subject: `[Brief Proyek Baru] ${subject || 'Desain'} dari ${name}`,
          html: htmlContent,
          text: `Brief Proyek Baru Masuk!\n\nNama: ${name}\nEmail: ${email}\nKategori: ${subject}\nBudget: ${budget_range}\n\nPesan:\n${message}\n`,
        });

        emailSent = true;
        providerUsed = 'nodemailer';
      } catch (smtpErr) {
        console.error('Nodemailer error:', smtpErr);
      }
    }

    // 2. Coba kirim via Web3Forms jika dikonfigurasi
    if (!emailSent && process.env.WEB3FORMS_ACCESS_KEY) {
      try {
        const w3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            to: recipientEmail,
            from_name: `${name} (Portofolio Brief)`,
            subject: `[Brief Proyek Baru] ${subject || 'Desain'} dari ${name}`,
            nama_klien: name,
            email_klien: email,
            kategori_proyek: subject,
            budget: budget_range,
            pesan_brief: message,
          }),
        });
        if (w3Res.ok) {
          emailSent = true;
          providerUsed = 'web3forms';
        }
      } catch (w3Err) {
        console.error('Web3Forms error:', w3Err);
      }
    }

    return NextResponse.json({
      success: true,
      emailSent,
      provider: providerUsed,
      message: emailSent
        ? 'Brief berhasil dikirim ke email.'
        : 'Brief tersimpan di sistem. Hubungi via WhatsApp atau konfigurasikan email di .env.local.',
    });
  } catch (err: any) {
    console.error('Contact API Error:', err);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memproses pesan.', details: err?.message },
      { status: 500 }
    );
  }
}
