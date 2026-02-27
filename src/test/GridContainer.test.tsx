import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rightsStoreState } from "./mockRightsStore"

vi.mock("../store/rightsStore", () => ({
  default: vi.fn(),
}))

import useRightsStore from "../store/rightsStore"
import GridContainer from "../containers/GridContainer"

describe("GridContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("enables Search and calls runSearch", async () => {
    const state = rightsStoreState({
      partnerName: "YouTube",
      effectiveDate: "2026-02-26",
    })

    vi.mocked(useRightsStore).mockReturnValue(state)

    render(<GridContainer />)

    const button = screen.getByRole("button", { name: /search/i })
    expect(button).toBeEnabled()

    const user = userEvent.setup()
    await user.click(button)

    expect(state.runSearch).toHaveBeenCalledTimes(1)
  })
})