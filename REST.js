var mysql   = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    });

    router.get("/localisation",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["localisation"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Localisation" : rows});
            }
        });
    });

    router.get("/localisation/:localisation_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var table = ["localisation","id",req.params.localisation_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Localisations" : rows});
            }
        });
    });

    router.post("/localisation",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
        var table = ["localisation","commune","code_postal","departement","insee",req.body.commune,req.body.code_postal,req.body.departement,req.body.insee];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Localisation Added !"});
            }
        });
    });

    router.put("/localisation",function(req,res){
        var query = "UPDATE localisation SET commune = ?,code_postal = ?,departement = ?,insee = ? WHERE id = ?";
        var table = [req.body.commune,req.body.code_postal,req.body.departement,req.body.insee,req.body.id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated localisation "+req.body.id});
            }
        });
    });

    router.delete("/localisation/:localisation_id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["localisation","id",req.params.localisation_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the user with id "+req.params.localisation_id});
            }
        });
    });
}

module.exports = REST_ROUTER;
