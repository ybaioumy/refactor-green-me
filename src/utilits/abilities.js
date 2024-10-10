import { AbilityBuilder, createMongoAbility } from '@casl/ability';

export const defineAbilityFor = (user, projectPermissions, typeId, projectType) => {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
console.log(projectPermissions);
    if (user.role === 'Admin') {
        if (!projectPermissions || projectPermissions.length === 0) { //ESCO
            // Admin without specific project permissions
            if (typeId === 2 && !projectType.hisOwn) {
                console.log('esco to view project opportunities');
                // If the project is esco and not their own, grant view-only access as project opportunities
                can('view', 'all'); // Admin can view everything
            }
            else if (typeId === 3 && (!projectPermissions || projectPermissions.length === 0)) {
                console.log('expert with not permissions');
                cannot('view', 'all');
                cannot('edit', 'all');
            }
            else {
                console.log('admin with all authorization permissions: ESCO');
                // If typeId is esco and this is his own project , grant full manage access
                can('manage', 'all');
            }
        } else {
            console.log(
                'expert with specific project permissions'
            );
            // If Admin is expert has specific permissions, parse them ,this case as expert 
            projectPermissions.forEach(permission => {
                const [entity, action] = permission.name.split('.');
                if (action === 'Edit') {
                    can('edit', entity);  // Grant edit permission for the entity
                } else if (action === 'View') {
                    can('view', entity);  // Grant view permission for the entity
                }
            });
        }
    } else {
        console.log('non-admin user with specific project permissions')
        // Non-admin users, parse permissions based on the project , this is fall back to admin 
        projectPermissions.forEach(permission => {
            const [entity, action] = permission.name.split('.');
            if (action === 'Edit') {
                can('edit', entity);
            } else if (action === 'View') {
                can('view', entity);
            }
        });
    }

    return build();  // Build the ability object
};
