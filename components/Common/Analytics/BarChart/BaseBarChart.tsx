import { BarChart, BarChartPropsType } from "react-native-gifted-charts";

import { COLORS } from "@/constants/Colors";

const BaseBarChart: React.FC<BarChartPropsType> = ({
    frontColor=COLORS.primary,
    ...props
}) => {
    return (
        <BarChart frontColor={frontColor} {...props} />
    );
};

export default BaseBarChart;