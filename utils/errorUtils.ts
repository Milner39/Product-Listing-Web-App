// #region Utils

const log = (error: unknown, fileUrl?: string) => {
    if (fileUrl) console.error(`At: ${fileUrl}:`)
    console.error(error instanceof Error ? error.stack : error)
}

// #endregion Utils



// #region Exports

const errorUtils = {
    log
}

export default errorUtils

export { log }

// #endregion Exports