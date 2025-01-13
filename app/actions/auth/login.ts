import { signIn } from "next-auth/react";
import { logModelOperation } from "@/app/lib/logMiddleware";

export const login = async (values: any) => {
  const { email, password } = values;

  if (!email || !password) {
    return {
      error: "Please fill all the fields!",
    };
  }

  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      return {
        error: "Invalid credentials!",
      };
    }

    // Başarılı login için log oluştur
    await logModelOperation(
      'create',
      'Auth',
      undefined,
      `Kullanıcı giriş yaptı: ${email}`
    );

    return {
      success: "Logged in successfully!",
    };
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }
}; 