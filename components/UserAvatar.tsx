import Image from "next/image";

const UserAvatar = ({ src }: { src: string }) => {
    return (
        <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-400 relative">
            <Image src={src} alt="" fill />
        </div>
    );
};

export default UserAvatar;
