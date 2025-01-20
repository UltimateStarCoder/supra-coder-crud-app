import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";

const protectedRoute = async (req, res) => {
    const session = await getServerSession({ req, res, authOptions });

    if (!session) {
        res.status(401).send("Unauthorized");
        return;
    }

    res.status(200).json( { message: 'This is a protected route.', session });
};

export default protectedRoute;