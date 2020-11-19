@echo OFF

set command=%1
set host=%2
set user=%3
set password=%4
set dbname=%5
set arcgis=%6


echo "START"
:: ----------
::
:: commands
::
:: ----------

if "%command%"=="createdb" goto createdb
if "%command%"=="createschema" goto createschema
if "%command%"=="createtables" goto createtables
if "%command%"=="addconstraints" goto addconstraints
if "%command%"=="createfunctions" goto createfunctions
if "%command%"=="createprocedures" goto createprocedures
if "%command%"=="createtriggers" goto createtriggers
if "%command%"=="addtsqlt" goto addtsqlt
if "%command%"=="addtestfunctions" goto addtestfunctions
if "%command%"=="addtestprocedures" goto addtestprocedures
if "%command%"=="addtests" goto addtestprocedures
if "%command%"=="test" goto test
if "%command%"=="dropdb" goto dropdb
if "%command%"=="doall" goto doall
goto help

:help
echo "******************************************************************************"
echo "Positional parameters:"
echo "----------------------"
echo "1) command - command to execute"
echo "2) host - url of the server"
echo "3) user - username of the database"
echo "4) password - password of the username"
echo "5) dbname - database name"
echo "6) arcgis - optional, indicate if tables where created by ArcGIS"
echo ""
echo "Commands:"
echo "---------"
echo "i) createdb - create database 'PlanesCoreGDB'"
echo "ii) createschema - create schema 'PlanesCore'"
echo "iii) createtables - create tables 'Chacras','Pendientes' and 'ZonasDeExclusion'"
echo "iv) addconstraints - add tables constraints"
echo "v) createfunctions - create auxiliar functions"
echo "vi) createprocedures - create auxiliar procedures"
echo "vii) createtriggers - create tables triggers"
echo "viii) addtsqlt - add test framework"
echo "ix) addtestfunctions - add test functions"
echo "x) addtestprocedures - add test procedures"
echo "xi) test - create and run test"
echo "xii) dropdb - drop database 'PlanesCoreGDB'"
echo "xii) doall - executes everything"
echo "xiii) help - display help"
echo "******************************************************************************"
goto done

:createdb
call :cdb
goto done

:createschema
call :schema
goto done

:createtables
call :tables
goto done

:createfunctions
call :functions
goto done

:createprocedures
call :procedures
goto done

:addconstraints
call :constraints
goto done

:createtriggers
call :triggers
goto done

:addtsqlt
call :tsqlt
goto done

:addtestfunctions
call :testfunctions
goto done

:addtestprocedures
call :testprocedures
goto done

:test
call :runtest
goto done

:dropdb
call :ddb
goto done

:doall
if NOT "%arcgis%"=="arcgis" (
  call :cdb
  call :tables
)
call :functions
call :procedures
call :constraints
call :triggers
call :tsqlt
call :testfunctions
call :testprocedures
call :runtest
goto done

:: ----------
::
:: run
::
:: ----------

:cdb
echo "creating database ..."
call :runwdb db\db_CreateDatabase.sql
EXIT /B 0

:schema
echo "creating schema ..."
call :run db\db_CreateSchema.sql
EXIT /B 0

:tables
echo "creating tables ..."
call :run db\db_CreateTables.sql
EXIT /B 0

:constraints
echo "adding constraints ..."
if "%arcgis%"=="arcgis" (
  call :run db\db_AddConstraints_ArcGIS.sql
) else (
  call :run db\db_AddConstraints.sql
)
EXIT /B 0

:functions
echo "loading functions ..."
call :run functions\func_HaySolape.sql
EXIT /B 0

:procedures
echo "loading procedures ..."
call :run procedures\proc_PlanesErrorBuilder.sql
call :run procedures\proc_RaiseRollback.sql
EXIT /B 0

:triggers
echo "loading triggers ..."
call :run triggers\trig_ForInsertChacras.sql
call :run triggers\trig_ForInsertPendientes.sql
call :run triggers\trig_ForInsertZonasDeExclusion.sql
call :run triggers\trig_ForUpdateChacras.sql
call :run triggers\trig_ForUpdatePendientes.sql
call :run triggers\trig_ForUpdateZonasDeExclusion.sql
call :run triggers\trig_InsteadOfDeleteChacras.sql
call :run triggers\trig_ForDeletePendientes.sql
call :run triggers\trig_InsteadOfDeleteZonasDeExclusion.sql
EXIT /B 0

:tsqlt
echo "adding test framework ..."
call :run tsqlt\tsqlt_SetClrEnabled.sql
call :run tsqlt\tsqlt_tsqlt.class.sql
EXIT /B 0

:testfunctions
echo "adding test functions ..."
call :run functions\func_GenerateSeries.sql
call :run functions\func_Tokenizer.sql
call :run functions\func_STMove.sql
call :run functions\func_GetLineString.sql
call :run functions\func_GetPolygon.sql
call :run functions\func_GetPolygonInner.sql
call :run functions\func_GetNextChacraId.sql
if "%arcgis%"=="arcgis" call :run functions\func_GetNextObjectId.sql
EXIT /B 0

:testprocedures
echo "adding test procedures ..."
if "%arcgis%"=="arcgis" (
  call :run procedures\proc_ChacraBuilder_ArcGIS.sql
  call :run procedures\proc_PendienteBuilder_ArcGIS.sql
  call :run procedures\proc_ZonaDeExclusionBuilder_ArcGIS.sql
) else (
  call :run procedures\proc_ChacraBuilder.sql
  call :run procedures\proc_PendienteBuilder.sql
  call :run procedures\proc_ZonaDeExclusionBuilder.sql
)
call :run procedures\proc_AddChacraPendiente.sql

EXIT /B 0

:runtest
echo "testing ..."
call :run tests\test_ChacrasTests.sql
call :run tests\test_PendientesTests.sql
call :run tests\test_ZonasDeExclusionTests.sql
call :run tests\test_ForInsertChacrasTests.sql
call :run tests\test_ForInsertPendientesTests.sql
call :run tests\test_ForInsertZonasDeExclusionTests.sql
call :run tests\test_ForUpdateChacrasTests.sql
call :run tests\test_ForUpdatePendientesTests.sql
call :run tests\test_ForUpdateZonasDeExclusionTests.sql
call :run tests\test_InsteadOfDeleteChacrasTests.sql
call :run tests\test_ForDeletePendientesTests.sql
call :run tests\test_InsteadOfDeleteZonasDeExclusionTests.sql
call :run tests\test_all.sql
EXIT /B 0

:ddb
echo "droping database ..."
call :run db\db_DropDatabase.sql
EXIT /B 0

:run
SQLCMD -S %host% -U %user% -P %password% -d %dbname% -i %~1 -I
EXIT /B 0

:runwdb
SQLCMD -S %host% -U %user% -P %password% -i %~1 -I
EXIT /B 0

:done
echo "DONE"
EXIT /B %ERRORLEVEL%