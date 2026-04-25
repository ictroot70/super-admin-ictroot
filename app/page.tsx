"use client";

import { LoginForm } from "@/features/admin/auth/ui/login-form";

export default function SuperAdminHome() {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">👑</div>
            <h1>Админ-панель</h1>
            <p>Введите учетные данные для входа</p>
          </div>
          <LoginForm />
          <div className="login-footer">
            <p>🔒 Безопасный вход</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .login-container {
          width: 100%;
          max-width: 450px;
          padding: 20px;
        }

        .login-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .login-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 50px rgba(0, 0, 0, 0.15);
        }

        .login-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .login-icon {
          font-size: 50px;
          margin-bottom: 15px;
          display: inline-block;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .login-header h1 {
          font-size: 28px;
          font-weight: 600;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .login-header p {
          color: #6b7280;
          font-size: 14px;
          margin-top: 8px;
        }

        .login-footer {
          margin-top: 24px;
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          color: #9ca3af;
          font-size: 12px;
        }

        /* Темная тема */
        @media (prefers-color-scheme: dark) {
          .login-page {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          }

          .login-card {
            background: #1f2937;
          }

          .login-header h1 {
            background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
            -webkit-background-clip: text;
            background-clip: text;
          }

          .login-header p {
            color: #9ca3af;
          }

          .login-footer {
            border-top-color: #374151;
            color: #6b7280;
          }
        }

        /* Адаптивность */
        @media (max-width: 640px) {
          .login-card {
            padding: 30px 20px;
          }

          .login-header h1 {
            font-size: 24px;
          }

          .login-icon {
            font-size: 40px;
          }
        }
      `}</style>
    </div>
  );
}
