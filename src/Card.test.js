import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

it("should render", () => {
  render(<Card />);
});

it("should match snapshot", () => {
  const { asFragment } = render(
    <Card
      caption="This is a dog"
      src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/07/top-20-small-dog-breeds.jpeg.jpg"
      currNum={4}
      totalNum={4}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
