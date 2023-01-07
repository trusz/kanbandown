export type Window = {
	addEventListener: <T>(type: string, listener:(event:{data:T}) => void ) => void
}