import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rightsStoreState } from "./mockRightsStore"

vi.mock("../store/rightsStore", () => ({
  default: vi.fn(),
}))

import useRightsStore from "../store/rightsStore"
import FileUploadContainer from "../containers/FileUploadContainer"

describe("FileUploadContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("calls parseFiles when clicked", async () => {
    const state = rightsStoreState({
      musicContractsText: "music",
      partnerContractsText: "partner",
    })

    vi.mocked(useRightsStore).mockReturnValue(state)

    render(<FileUploadContainer />)

    const button = screen.getByRole("button", { name: /parse/i })
    await waitFor(() => expect(button).not.toBeDisabled())

    const user = userEvent.setup()
    await user.click(button)

    expect(state.parseFiles).toHaveBeenCalledTimes(1)
  })
})