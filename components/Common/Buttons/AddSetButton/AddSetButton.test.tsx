import { fireEvent, render } from "@testing-library/react-native";

import * as Haptics from "@/utils/haptics/haptics";

import AddSetButton from "./AddSetButton";

describe("AddSetButton", () => {
    it("renders correctly", () => {
        const { getByTestId } = render(<AddSetButton addSet={jest.fn()} />);

        expect(getByTestId("add-set-button")).toBeTruthy();
        expect(getByTestId("add-set-plus-icon")).toBeTruthy();
        expect(getByTestId("add-set-dumbbell-icon")).toBeTruthy();
    });

    it("calls light haptic and addSet on press", () => {
        const lightHapticMock = jest
            .spyOn(Haptics, "lightHaptic")
            .mockImplementation(() => Promise.resolve());
        const addSetMock = jest.fn();

        const { getByTestId } = render(<AddSetButton addSet={addSetMock} />);

        fireEvent.press(getByTestId("add-set-touchable"));

        expect(lightHapticMock).toHaveBeenCalled();
        expect(addSetMock).toHaveBeenCalled();

        lightHapticMock.mockRestore();
    });
});
