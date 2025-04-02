import { ConfigProvider, Progress } from "antd";

const ProgressCircle = ({ vote_average = 0 }) => {
  const changeColor = (rate) => {
    const rateAverage = Math.round(rate);
    if (rateAverage < 3) return "#E90000";
    if (rateAverage < 5) return "#E97E00";
    if (rateAverage < 7) return "#E9D100";
    return "#66E900";
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Progress: {
            remainingColor: changeColor(vote_average),
          },
        },
      }}
    >
      <Progress
        type="circle"
        size={30}
        strokeWidth={6}
        format={() => vote_average.toFixed(1)}
      />
    </ConfigProvider>
  );
};

export default ProgressCircle;
