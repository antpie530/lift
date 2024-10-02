import { render } from "@testing-library/react-native";

import Duration from "./Duration";

describe("Duration", () => {
    it("renders correctly", () => {
        const { getByTestId } = render(<Duration duration={50000} />);

        expect(getByTestId("duration")).toBeTruthy();
        expect(getByTestId("duration-clock-icon")).toBeTruthy();
        expect(getByTestId("duration-output")).toBeTruthy();
    });

    it("displays correct duration (singlular)", () => {
        const { getByText } = render(<Duration duration={60000} />);

        expect(getByText("1 min")).toBeTruthy();
    });

    it("displays correct duration (plural)", () => {
        const { getByText } = render(<Duration duration={180000} />);

        expect(getByText("3 mins")).toBeTruthy();
    });
});
