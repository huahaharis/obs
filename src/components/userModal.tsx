import { Modal, Input } from "antd";
import { useState, useEffect } from "react";
import type { User } from "../types/user";
import { useUserStore } from "../store/userStore";

interface Props {
    open: boolean;
    user: User | null;
    onCancel: () => void;
    onSubmit: (data: Omit<User, "id">) => void;
}

export const UserModal = ({ open, user, onCancel, onSubmit }: Props) => {
    const [form, setForm] = useState<Omit<User, "id">>({ name: "", email: "", phone: "" });
    const { actionLoading } = useUserStore();

    useEffect(() => {
        if (user) setForm({ name: user.name, email: user.email, phone: user.phone });
        else setForm({ name: "", email: "", phone: "" });
    }, [user, open]);

    const handleSubmit = () => {
        onSubmit(form);
        setForm({ name: "", email: "", phone: "" });
    };

    const getModalWidth = () => {
        if (window.innerWidth < 640) return "90%";
        if (window.innerWidth < 1024) return 500;
        return 520;
    };

    return (
        <Modal
            title={user ? "Edit User" : "Add User"}
            open={open}
            onCancel={onCancel}
            onOk={handleSubmit}
            okText={user ? "Save Changes" : "Add"}
            confirmLoading={actionLoading}
            width={getModalWidth()}
            centered
            bodyStyle={{ padding: "1.5rem" }}
        >
            <div className="flex flex-col gap-4">
                <Input
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-2"
                />
                <Input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full p-2"
                />
                <Input
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setForm({ ...form, phone: value });
                    }}
                    className="w-full p-2"
                />
            </div>
        </Modal>
    );
};
