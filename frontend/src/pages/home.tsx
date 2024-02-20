import { RestActors } from "@app/canisters";

import { AuthButton, useAuth, useRestActor } from "@bundly/ic-react";
import { useEffect } from "react";

export default function HomePage() {
    const { isAuthenticated } = useAuth();
    const backend = useRestActor<RestActors>("backend");

    useEffect(() => {
        console.log({ isAuthenticated });
    }, [isAuthenticated]);

    async function testFunction() {
        try {
            const response = await backend.post("/test", { hello: "world" }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log({ response });
        } catch (error) {
            console.error({ error });
        }
    }

    async function whoAmI() {
        try {
            const response = await backend.get("/whoami");

            console.log(response.body);
        } catch (error) {
            console.error({ error });
        }
    }

    return (
        <div>
            <h1>Home Page</h1>
            <AuthButton />
            <div>
                <button onClick={() => whoAmI()}>Who Am I</button>
                <button onClick={() => testFunction()}>Test</button>
            </div>

        </div>
    );
}
