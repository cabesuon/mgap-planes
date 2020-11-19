-- USE PlanesCoreGDB;
-- GO

DECLARE @cmd nvarchar(MAX) = '';

WITH x AS (
    SELECT TOP 10000 
           PL.Id                                            AS Id
          ,PARSENAME(PL.OriginalName,1)                     AS OriginalName
          ,ISNULL(SO.name,'')                               AS name
          ,QUOTENAME(SCHEMA_NAME(ISNULL(SO.schema_id,1)))   AS SchemaName
          ,ISNULL(SEP.major_id,-1)                          AS major_id
      FROM tSQLt.Private_RenamedObjectLog PL
      LEFT JOIN sys.objects SO
        ON ObjectId = object_id
      LEFT JOIN sys.extended_properties SEP
        ON SEP.major_id = SO.object_id
       AND SEP.name = 'tSQLt.FakeTable_OrgTableName'
     ORDER BY SO.create_date DESC
)
SELECT @cmd = @cmd 
       + CASE WHEN x.name = '' OR OriginalName = x.name 
              THEN N'DELETE tSQLt.Private_RenamedObjectLog WHERE Id = ' + CAST(x.Id AS nvarchar) + N';'
              ELSE N'DROP ' 
                 + N'TABLE'   --Replace this with a CASE statement to deal with other object types
                 + N' ' + SchemaName + '.' + QUOTENAME(x.OriginalName) + '; ' 
                 + NCHAR(13) + NCHAR(10) + N'EXEC sp_rename ''' + SchemaName + N'.' 
                                         + QUOTENAME(x.name) + N''',''' + OriginalName + N''';'
                 + NCHAR(13) + NCHAR(10) + N'IF OBJECT_ID('''+SchemaName + N'.' + QUOTENAME(x.name)+N''') IS NULL'
                 + NCHAR(13) + NCHAR(10) + N'BEGIN'
                 + CASE WHEN x.major_id != -1 
                        THEN NCHAR(13) + NCHAR(10) + N'    EXEC sp_dropextendedproperty ''tSQLt.FakeTable_OrgTableName'',''SCHEMA'',''' 
                           + PARSENAME(SchemaName,1) + N''',''TABLE'',''' + OriginalName + N''';'
                        ELSE ''
                   END
                 + NCHAR(13) + NCHAR(10) + N'    DELETE tSQLt.Private_RenamedObjectLog WHERE Id = ' + CAST(x.Id AS nvarchar) + N';'
                 + NCHAR(13) + NCHAR(10) + N'END'
         END
       + NCHAR(13) + NCHAR(10)
       + NCHAR(13) + NCHAR(10)
  FROM x;

/*   <-Remove leading dashes to execute
PRINT @cmd;
*/EXEC (@cmd);