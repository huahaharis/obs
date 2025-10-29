import { useEffect, useState } from "react";
import { Button, Empty, Spin } from "antd";
import { UserCard } from "../components/userCard";
import { UserModal } from "../components/userModal";
import { useUserStore } from "../store/userStore";
import type { User } from "../types/user";

export const UserListPage = () => {
    const { users, fetchUsers, addUser, updateUser, deleteUser, loading, actionLoading } = useUserStore();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<User | null>(null);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
            <header
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pt-4 sm:pt-6 md:pt-8"
            >
                <h1
                    className="text-2xl md:text-3xl font-bold text-gray-800 text-center sm:text-left w-full sm:w-auto"
                >
                    User Management
                </h1>
                <div className="w-full sm:w-auto flex justify-center sm:justify-end">
                    <Button
                        type="primary"
                        size="large"
                        className="w-full sm:w-auto !rounded-lg !px-6 !py-2 !text-base"
                        onClick={() => setOpen(true)}
                    >
                        Add User
                    </Button>
                </div>
            </header>


            {(loading || actionLoading) ? (
                <div className="flex justify-center items-center py-20">
                    <Spin spinning={loading}>
                        <p className="text-lg text-gray-500">Loading Users...</p>
                    </Spin>
                </div>
            ) : users.length === 0 ? (
                <Empty description="No users found" className="py-20" />
            ) : (
                <div
                    className="
                    grid
                    gap-6
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    xl:grid-cols-5
                    place-items-stretch
                "
                >
                    {users.map((u) => (
                        <UserCard
                            key={u.id}
                            user={u}
                            onEdit={() => {
                                setSelected(u);
                                setOpen(true);
                            }}
                            onDelete={() => deleteUser(u.id)}
                        />
                    ))}
                </div>

            )}

            <UserModal
                open={open}
                user={selected}
                onCancel={() => {
                    setSelected(null);
                    setOpen(false);
                }}
                onSubmit={(data) => {
                    selected ? updateUser(selected.id, data) : addUser(data);
                    setSelected(null);
                    setOpen(false);
                }}
            />
        </div>
    );
};
