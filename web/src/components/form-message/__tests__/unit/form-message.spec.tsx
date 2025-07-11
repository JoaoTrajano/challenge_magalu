import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormMessage } from "../../form-message";

describe("FormMessage", () => {
  it("should not render anything if no message is passed", () => {
    const { container } = render(<FormMessage />);
    expect(container.firstChild).toBeNull();
  });

  it("should render the error message correctly", () => {
    const errorMessage = "Campo obrigatório";
    render(<FormMessage message={errorMessage} />);

    const paragraph = screen.getByText(errorMessage);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass("text-[0.8rem]");
    expect(paragraph).toHaveClass("font-bold");
    expect(paragraph).toHaveClass("text-red-500");
  });
});
