interface AuthLayoutprops{
    children: React.ReactNode
}


export default function AuthLayout({ children }: AuthLayoutprops) {
    return <div className="min-h-screen">{children}</div>
}