export const dateFormat = (dateString: any) => {
    const date = new Date(dateString)
  
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  
    return formattedDate
  }
  