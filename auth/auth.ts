import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
const auth = async () => {
    const token = (await cookies()).get("session-token")?.value;
    if (!token) {
        return null
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded
}

export default auth 