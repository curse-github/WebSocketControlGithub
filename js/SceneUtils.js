 function createMeshesFromInstancedMesh(instancedMesh) {

    var group = new THREE.Group();

    var count = instancedMesh.count;
    var geometry = instancedMesh.geometry;
    var material = instancedMesh.material;

    for (var i = 0; i < count; i++) {

        var mesh = new THREE.Mesh(geometry, material);

        instancedMesh.getMatrixAt(i, mesh.matrix);
        mesh.matrix.decompose(mesh.position, mesh.quaternion, mesh.scale);

        group.add(mesh);

    }

    group.copy(instancedMesh);
    group.updateMatrixWorld(); // ensure correct world matrices of meshes

    return group;

}

function createMultiMaterialObject(geometry, materials) {

    var group = new THREE.Group();

    for (var i = 0, l = materials.length; i < l; i++) {

        group.add(new THREE.Mesh(geometry, materials[i]));

    }

    return group;

}
function detach(child, parent, scene) {

    console.warn('THREE.SceneUtils: detach() has been deprecated. Use scene.attach( child ) instead.');

    scene.attach(child);

}

function attach(child, scene, parent) {

    console.warn('THREE.SceneUtils: attach() has been deprecated. Use parent.attach( child ) instead.');

    parent.attach(child);

}