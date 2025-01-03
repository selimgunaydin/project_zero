import { signOut } from "next-auth/react";
import { FC } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const ProfileMenu: FC = () => {
  const router = useRouter();
  return (
    <div className="w-64 bg-white h-screen p-6 border-r">
      <ul className="space-y-6">
        <li>
          <Link
            href="/profile"
            className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            Profilim
          </Link>
        </li>
        <ul>
          <li>
            <Link
              href="#"
              className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200"
            >
              Başlık
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="block text-sm text-gray-500 mt-1"
            >
              Alt Başlık
            </Link>
          </li>
        </ul>

        <li>
          <Link
            href="/profile/settings"
            className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            Ayarlar
          </Link>
        </li>
        <li>
          <button
            className="w-full text-center bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                router.push("/");
              });
            }}
          >
            Çıkış Yap
          </button>
        </li>
      </ul>
    </div>
  );
};
