import { render, screen } from "@testing-library/react";
import TreeViewer from "./TreeViewer";

describe("TreeViewer", () => {
  test("renders heading", async () => {
    render(<TreeViewer />);
    expect(screen.getByRole("heading", { name: "Filesystem representation" })).toBeTruthy()
  });
});