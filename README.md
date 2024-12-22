# snow
## FiveM resource for enabling snowy weather (including snow ground cover)
### Usage
This resource is client-side only. No building/transpiling required as it's plain JS. Just place this repository folder in your server's `resources` folder and add `ensure snow` to your `server.cfg` (or call `start snow` in the server commandline or whatever, I'm not your mum)

### Convars
[Convars](https://docs.fivem.net/docs/scripting-reference/convars/) are FiveM's way of configuring variables that can be used by the resource.

You can provide your own values for these convars in your `server.cfg` file, or by using the `setr` command in the server console.

This resource exposes the following convars:

| Convar | Description | Default value |
| --- | --- | --- |
| `snow_spawnTree` | Should a Christmas tree be spawned at Legion Square? | true |