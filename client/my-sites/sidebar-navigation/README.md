Sidebar Navigation
==================

This component is used to display the mobile sidebar navigation header at the top of content sections. It sets `layout-focus` to `sidebar`.

#### How to use:

Put the component in your `Main` component. It handles detecting the selected site.

```js
var SidebarNavigation = require( 'my-sites/sidebar-navigation' );

render: function() {
    return(
        <Main>
		      <SidebarNavigation />
        </Main>
    );
}
```
