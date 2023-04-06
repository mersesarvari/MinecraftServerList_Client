import ServerPanel from "./ServerPanel";

const ServerListPanel = (props) => {
  return (
    <>
      {props.servers &&
        props.servers.map((server) => (
          <ServerPanel key={server.id} server={server} />
        ))}
    </>
  );
};

export default ServerListPanel;
