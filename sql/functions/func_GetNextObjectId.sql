-- USE PlanesCoreGDB;
-- GO

IF OBJECT_ID(N'[dbo].[GetNextObjectId]') IS NOT NULL
	DROP FUNCTION [dbo].[GetNextObjectId];
GO
CREATE FUNCTION [dbo].[GetNextObjectId] (
  @NomSchema nvarchar(100),
	@NomTable nvarchar(100)
) RETURNS int
AS
BEGIN
	DECLARE @ObjectId int;
	EXEC dbo.next_rowid @NomSchema, @NomTable, @ObjectId OUTPUT;
	RETURN @ObjectId;
END;
