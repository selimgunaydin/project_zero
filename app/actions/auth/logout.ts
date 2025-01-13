import { signOut } from "next-auth/react";
import { logModelOperation } from "@/app/lib/logMiddleware";

export const logout = async () => {
  try {
    // Logout işlemi için log oluştur
    await logModelOperation(
      'create',
      'Auth',
      undefined,
      'Kullanıcı çıkış yaptı'
    );
    
    await signOut({
      redirect: true,
      callbackUrl: "/",
    });
  } catch (error) {
    console.error("Logout error:", error);
  }
}; 