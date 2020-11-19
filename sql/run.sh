#!/bin/sh

command=$1
host=$2
user=$3
password=$4
dbname=$5
arcgis=$6
# ARCGIS="arcgis"
NOBD="nodb"

echo "START 1: $command 2: $host 3: $user 4: $password 5: $dbname 6: $arcgis" 

run () {
    if [ "$2" = "$NOBD" ]
    then
        sqlcmd -S "$host" -U "$user" -P "$password" -i $1
    else
        sqlcmd -S "$host" -U "$user" -P "$password" -d "$dbname" -i $1
    fi
}

createdb () {
    echo "creating database ..."
    run "db/db_CreateDatabase.sql" $NOBD
}

createschema () {
    echo "creating schema ..."
    run "db/db_CreateSchema.sql"
}

createtables () {
    echo "creating tables ..."
    run "db/db_CreateTables.sql" 1
}

addconstraints () {
    echo "adding constraints ..."
    if [ "$arcgis" = "arcgis" ]
    then
        run "db/db_AddConstraints_ArcGIS.sql"
    else
        run "db/db_AddConstraints.sql"
    fi
}

createfunctions () {
    echo "loading functions ..."
    run "functions/func_HaySolape.sql"
}

createprocedures () {
    echo "loading procedures ..."
    run "procedures/proc_PlanesErrorBuilder.sql"
    run "procedures/proc_RaiseRollback.sql"
}

createtriggers () {
    echo "loading triggers ..."
    run "triggers/trig_ForInsertChacras.sql"
    run "triggers/trig_ForInsertPendientes.sql"
    run "triggers/trig_ForInsertZonasDeExclusion.sql"
    run "triggers/trig_ForUpdateChacras.sql"
    run "triggers/trig_ForUpdatePendientes.sql"
    run "triggers/trig_ForUpdateZonasDeExclusion.sql"
    run "triggers/trig_InsteadOfDeleteChacras.sql"
    run "triggers/trig_ForDeletePendientes.sql"
    run "triggers/trig_InsteadOfDeleteZonasDeExclusion.sql"
}

addtsqlt () {
    echo "adding test framework ..."
    run "tsqlt/tsqlt_SetClrEnabled.sql"
    run "tsqlt/tsqlt_tSQLt.class.sql"
}

addtestfunctions () {
    echo "adding test functions ..."
    run "functions/func_GenerateSeries.sql"
    run "functions/func_Tokenizer.sql"
    run "functions/func_STMove.sql"
    run "functions/func_GetLineString.sql"
    run "functions/func_GetPolygon.sql"
    run "functions/func_GetPolygonInner.sql"
    run "functions/func_GetNextChacraId.sql"
    if [ "$arcgis" = "arcgis" ]
    then
        run "functions/func_GetNextObjectId.sql"
    fi
}

addtestprocedures () {
    echo "adding test procedures ..."
    if [ "$arcgis" = "arcgis" ]
    then
        run "procedures/proc_ChacraBuilder_ArcGIS.sql"
        run "procedures/proc_PendienteBuilder_ArcGIS.sql"
        run "procedures/proc_ZonaDeExclusionBuilder_ArcGIS.sql"
    else
        run "procedures/proc_ChacraBuilder.sql"
        run "procedures/proc_PendienteBuilder.sql"
        run "procedures/proc_ZonaDeExclusionBuilder.sql"
    fi
    run "procedures/proc_AddChacraPendiente.sql"
}

testdb () {
    echo "testing ..."
    run "tests/test_ChacrasTests.sql"
    run "tests/test_PendientesTests.sql"
    run "tests/test_ZonasDeExclusionTests.sql"
    run "tests/test_ForInsertChacrasTests.sql"
    run "tests/test_ForInsertPendientesTests.sql"
    run "tests/test_ForInsertZonasDeExclusionTests.sql"
    run "tests/test_ForUpdateChacrasTests.sql"
    run "tests/test_ForUpdatePendientesTests.sql"
    run "tests/test_ForUpdateZonasDeExclusionTests.sql"
    run "tests/test_InsteadOfDeleteChacrasTests.sql"
    run "tests/test_ForDeletePendientesTests.sql"
    run "tests/test_InsteadOfDeleteZonasDeExclusionTests.sql"
    run "tests/test_PlanesErrorTests.sql"
    run "tests/test_all.sql"
}

dropdb () {
    echo "droping database ..."
    run "db/db_DropDatabase.sql" $NOBD
}

runhelp () {
    echo "******************************************************************************"
    echo "Positional parameters:"
    echo "----------------------"
    echo "1) command - command to execute"
    echo "2) host - url of the server"
    echo "3) user - username of the database"
    echo "4) password - password of the username"
    echo "5) dbname - database name"
    echo "6) arcgis - optional, indicate if tables where created by ArcGIS"
    echo "---------"
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
}

case "$command" in
    "createdb") createdb
    ;;
    "createschema") createschema
    ;;
    "createtables") createtables
    ;;
    "addconstraints") addconstraints
    ;;
    "createfunctions") createfunctions
    ;;
    "createprocedures") createprocedures
    ;;
    "createtriggers") createtriggers
    ;;
    "addtsqlt") addtsqlt
    ;;
    "addtestfunctions") addtestfunctions
    ;;
    "addtestprocedures") addtestprocedures
    ;;
    "test") testdb
    ;;
    "dropdb") dropdb
    ;;
    "doall") createdb
        createtables
        addconstraints
        createfunctions
        createprocedures
        createtriggers
        addtsqlt
        addtestfunctions
        addtestprocedures
        testdb
    ;;
    *) runhelp
    ;;
esac

echo "DONE"
