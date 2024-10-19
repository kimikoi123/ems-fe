import Link from "next/link";
import { User } from "@/app/interfaces/user";

interface UserCardProps {
  userData: User;
}

const UserCard: React.FC<UserCardProps> = ({ userData }) => {
  return (
    <div className="flex gap-4">
      <div className="w-[100px] h-[100px] bg-cyan-300 rounded-lg" />
      <div className="flex-1">
        <h1 className="text-lg font-bold">
          {userData.firstName} {userData.lastName}
        </h1>
        <div>
          {userData.role} ({userData.id})
        </div>
        <div>{userData.emailAddress}</div>
        <div>{userData.phoneNumber}</div>
      </div>
      <Link href={`/user/${userData.id}`}>
        <button className="bg-blue-500 text-white p-2 rounded">
          Edit Details
        </button>
      </Link>
    </div>
  );
};

export default UserCard;
