import { Card, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { User } from "../types/user";

interface Props {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

export const UserCard = ({ user, onEdit, onDelete }: Props) => {
  return (
    <Card
      hoverable
      className="
        w-full
        flex flex-col
        justify-between
        rounded-2xl
        shadow-md
        hover:shadow-lg
        transition-all
        bg-white
      "
      cover={
        <img
          alt={user.name}
          src={user.image}
          className="h-48 w-full object-cover rounded-t-2xl"
        />
      }
    >
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 truncate">{user.name}</h2>
          <p className="text-gray-500 text-sm break-all">{user.email}</p>
        </div>
        <div className="flex gap-2 mt-4">
          <Button icon={<EditOutlined />} onClick={onEdit} className="flex-1" />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={onDelete}
            className="flex-1"
          />
        </div>
      </div>
    </Card>
  );
};
