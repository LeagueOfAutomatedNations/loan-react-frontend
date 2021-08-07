import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import PeopleIcon from '@material-ui/icons/People';
// import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from "@material-ui/icons/Layers";
// import AssignmentIcon from '@material-ui/icons/Assignment';
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Fragment } from "react";
import { Route, MemoryRouter } from "react-router";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";
import { Box, Divider, List, Paper, Typography } from "@material-ui/core";

// https://material-ui.com/components/lists/#nested-list

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to">>(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const ShardMenuItem = (props: any) => {
  return (
    <>
      <Divider />
      <ListSubheader inset>{props.shard}</ListSubheader>
      <ListItemLink to={`/${props.shard}/map/alliances`} primary="Alliance Map" icon={<LayersIcon />} />
      <ListItemLink to={`/${props.shard}/map/players`} primary="Player Map" icon={<LayersIcon />} />
      <ListItemLink to={`/${props.shard}/map/clones`} primary="Clone Map" icon={<LayersIcon />} />
    </>
  );
};

export const mainListItems = (
  <Box sx={{ width: 360 }}>
    <Paper elevation={0}>
      {/* TODO: move login to AppBar, top right corner */}
      <ListItemLink to="/login" primary="Login" icon={<VpnKeyIcon />} />
      <ListSubheader inset>Alliance</ListSubheader>
      <Divider />
      <List aria-label="main mailbox folders">
        <ListItemLink to="/alliances" primary="Alliance Index" icon={<LayersIcon />} />
        <ListItemLink to="/alliances/rankings" primary="Alliance Rankings" icon={<LayersIcon />} />
        <ListItemLink to="/player/rankings" primary="Player Rankings" icon={<LayersIcon />} />
        <ListItemLink to="/player/rankings/gcl" primary="Player GCL Rankings" icon={<LayersIcon />} />
        <ListItemLink to="/player/rankings/power" primary="Player Power Rankings" icon={<LayersIcon />} />
      </List>
      <ShardMenuItem shard="shard0" />
      <ShardMenuItem shard="shard1" />
      <ShardMenuItem shard="shard2" />
      <ShardMenuItem shard="shard3" />
      <ListItemLink to="/tools" primary="Tools" icon={<LayersIcon />} />
      <ListItemLink to="/api" primary="API" icon={<LayersIcon />} />
      {/* TODO: should be links to discord & screeps & gitthub, perhaps github should be a page linking to the different parts of LOAN */}
      <ListItemLink to="/discord" primary="Discord" icon={<LayersIcon />} />
      <ListItemLink to="/screeps" primary="screeps" icon={<LayersIcon />} />
      <ListItemLink to="/screeps" primary="GitHub" icon={<GitHubIcon />} />
    </Paper>
  </Box>
);

export const secondaryListItems = (
  <div>
    {/* <ListSubheader inset>Saved reports</ListSubheader> */}
    {/* <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem> */}
  </div>
);
