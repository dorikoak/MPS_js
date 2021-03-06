var express = require('express');
var template = require('./template');
var query = require('./query');
var registerUser = require('./registerUser');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/', function(request, response) {
    var list = `<table class="table table-hover">
    <thead>
    <tr>
        <th scope="col">PrinterID</th>
        <th scope="col">Black</th>
        <th scope="col">Magenta</th>
        <th scope="col">Cyan</th>
        <th scope="col">Yellow</th>
        <th scope="col">Drum</th>
        <th scope="col">UsingPaper</th>
    </tr>
    </thead>
    <tbody>`;
    // let obj = {
    // id : 'Epson cx-29',
    // black : 100,
    // magenta : 20,
    // cyan : 30,
    // yellow : 40,
    // drum : 20,
    // Paper : 24884
    // };
    // list = list + template.list(obj);

    for (let i = 0; i < printerList.length(); i++) {
      let queryjson = await query('updatePrint', printerList[i], null);
      console.log(queryjson);
      let obj = JSON.parse(queryjson);
      list = list + templateList(obj);
    }

      list = list + `  </tbody>
    </table>
   <button type="button" class="btn btn-primary" onClick="location.href='/enroll'">복합기 등록</button>
   <button type="button" class="btn">삭제</button>`

      var html = template.HTML(list);

      response.send(html);
});

app.get('/login', function(request, response) {
    var html = template.HTML(`
                <form action="http://localhost:3000/login_process" method="post">
                  <p><input type="text" name="ID" placeholder="ID"></p>
                  <p><input type="text" name="PW" placeholder="PW"></p>
                  <p>
                    <input type="submit" class="btn btn-primary"/>
                    <button type="button" class="btn" onClick="location.href='/'">취소</button>
                  </p>
                </form>
              `);
      response.send(html);
});

app.get('/enroll', function(request, response) {
    var html = template.HTML(`
              <form action="http://localhost:3000/enroll_process" method="post">
                <p><input type="text" name="ID" placeholder="ID"></p>
                <p>
                  <textarea name="IP" placeholder="IP"></textarea>
                </p>
                <p>
                  <input type="submit" class="btn btn-primary"/>
                  <button type="button" class="btn" onClick="location.href='/'">취소</button>
                </p>
              </form>
            `);
    response.send(html);
});

app.post('/enroll_process', function(request, response) {
    var id = request.body.ID;
    var ip = request.body.IP;
    printerList.push(id);
    
    console.log(request.body)
    console.log(id)
    response.redirect('/')
});

app.post('/login_process', function(request, response) {
    var id = request.body.ID;
    var pw = request.body.PW;
    
    console.log(request.body)
    console.log(id)
    registerUser.registerUser(id, pw);
    response.redirect('/')
});

app.get('/test', function(request, response) {
    response.send('test');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
})

