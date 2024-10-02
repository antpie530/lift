import { render } from "@testing-library/react-native";
import TimezoneMock from "timezone-mock";

import Timestamp from "./Timestamp";

describe("Timestamp", () => {
    beforeAll(() => {
        TimezoneMock.register("UTC");
    });

    afterAll(() => {
        TimezoneMock.unregister();
    });

    it("renders correctly", () => {
        const { getByTestId } = render(<Timestamp timestamp={1727894372585} />);

        expect(getByTestId("timestamp-container")).toBeTruthy();
        expect(getByTestId("timestamp-icon")).toBeTruthy();
        expect(getByTestId("timestamp")).toBeTruthy();
    });

    it("displays the correct date and time", () => {
        const { getByText } = render(<Timestamp timestamp={1727894372585} />);

        expect(getByText("6:39 PM October 2, 2024")).toBeTruthy();
    });
});
