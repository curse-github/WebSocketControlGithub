os.loadAPI("json");
function prepare(val) 
    if type(val) == "table" then
        returnVal = json.encode(val)
        returnVal = string.gsub(returnVal,":","|")
        returnVal = string.gsub(returnVal,"\n","")
        returnVal = string.gsub(returnVal," ","")
        returnVal = string.gsub(returnVal,"\"","\\\"")
        return returnVal
    else  return tostring(val) end
end

ws, err = http.websocket("ws://{ip of server}:{port}")
if ws ~= false then
    shell.run("clear")
    write("CraftOS 1.8\n> _\n")
    
    ws.send("{\"type\":\"connection\",\"connection\":\"turtle\"}")
    while true do
        message = ws.receive()
        obj = json.decode(message.."\n")
        if obj.type == "lua" then
            output = {}
            func, err = loadstring("output[0], output[1], output[2] = "..obj.cmd)
            setfenv(func, getfenv())
            func()
            if obj.rtrnTyp ~= "false" then
                ws.send("{\"type\":\"return\", \"id\":\""..obj.id.."\", \"rtrnTyp\":\""..obj.rtrnTyp.."\", \"return\":\""..prepare(output[0])..", "..prepare(output[1])..", "..prepare(output[2]).."\", \"evntNm\":\""..obj.evntNm.."\"}")
            end
        else
            ws.send("{\"type\":\"reply\", \"id\":\""..obj.id.."\"}")
        end
    end
else write(err.."\n") end