-- USE PlanesCoreGDB;
-- GO

IF OBJECT_ID(N'[dbo].[PlanesErrorBuilder]', 'P') > 0
	DROP PROCEDURE [dbo].[PlanesErrorBuilder];
GO
CREATE PROCEDURE [dbo].[PlanesErrorBuilder] (
    @Severity int = NULL,
    @State int = NULL,
    @Procedure varchar (128) = NULL,
    @Message varchar (MAX) = NULL,
    @Context varchar (MAX) = NULL,
    @Id int = NULL OUT
)
AS
BEGIN
    INSERT [dbo].[PlanesError] (
        [Severity],
        [State],
        [Procedure],
        [Context],
        [Message]
    )
    VALUES (
        @Severity,
        @State,
        @Procedure,
        @Context,
        @Message
    )
    SET @Id = SCOPE_IDENTITY();
END;
GO
