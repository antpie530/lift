import { fireEvent, render } from "@testing-library/react-native";

import * as Haptics from "@/utils/haptics/haptics";

import ExitButton from "./ExitButton";

describe("ExitButton", () => {
    it("renders correctly", () => {
        const { getByTestId } = render(<ExitButton onPress={jest.fn()} />);

        expect(getByTestId("exit-button")).toBeTruthy();
        expect(getByTestId("exit-button-icon")).toBeTruthy();
    });

    it("calls lightHaptic and onPress on press", () => {
        const lightHapticMock = jest
            .spyOn(Haptics, "lightHaptic")
            .mockImplementation(() => Promise.resolve());
        const onPressMock = jest.fn();

        const { getByTestId } = render(<ExitButton onPress={onPressMock} />);

        fireEvent.press(getByTestId("exit-button"));

        expect(lightHapticMock).toHaveBeenCalled();
        expect(onPressMock).toHaveBeenCalled();

        lightHapticMock.mockRestore();
    });
});
