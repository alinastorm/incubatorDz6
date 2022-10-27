import dbMongoService from "./_common/db-adapters/mongo/mongoDb-adapter";
import httpService from "./_common/services/http-service/http-service";




(async function () {
    await dbMongoService.connect()
    httpService.runHttpServer()
})()