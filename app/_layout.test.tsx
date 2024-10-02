import { render } from "@testing-library/react-native";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

import RootLayout from "./_layout";

jest.mock("drizzle-orm/expo-sqlite/migrator", () => ({
    useMigrations: jest.fn(),
}));

jest.mock("expo-router", () => {
    const { View } = require("react-native");
    const MockStack = ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
    );
    MockStack.Screen = (() => <View testID="stack-screen" />) as React.FC;
    MockStack.Screen.displayName = "MockStackScreen";
    return { Stack: MockStack };
});

jest.mock("@/db/db", () => ({}));

jest.mock("react-native-gesture-handler", () => {
    return {
        GestureHandlerRootView: ({
            children,
        }: {
            children: React.ReactNode;
        }) => <>{children}</>,
    };
});

describe("RootLayout", () => {
    it("renders error message when migration fails", () => {
        (useMigrations as jest.Mock).mockReturnValue({
            error: { message: "Test Error" },
            success: false,
        });

        const { getByText } = render(<RootLayout />);

        expect(getByText("Database migrations error: Test Error")).toBeTruthy();
    });

    it("renders loading message while migrations are not finished", () => {
        (useMigrations as jest.Mock).mockReturnValue({
            error: undefined,
            succes: false,
        });

        const { getByText } = render(<RootLayout />);

        expect(getByText("Database loading...")).toBeTruthy();
    });

    it("renders the main layout when migrations are successful", () => {
        (useMigrations as jest.Mock).mockReturnValue({
            error: undefined,
            success: true,
        });

        const { getByTestId } = render(<RootLayout />);

        expect(getByTestId("stack-screen")).toBeTruthy();
    });
});
