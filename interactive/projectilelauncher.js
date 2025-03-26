class ProjectileLauncher {
    
    static fixOverlap(projectile) {
        
        if (ProjectilePhysics.isTargetHit(projectile)) {
            
            const overlapX = projectile.width - Math.abs(projectile.deltaX)
            const overlapY = projectile.height - Math.abs(projectile.deltaY)
            
            if (overlapX >= overlapY) {
                projectile.y += overlapY * -projectile.directionY
            } else {
                projectile.x += overlapX * -projectile.directionX
            }
            
        }
        
    }
    
    static isTargetHit(projectile) {
        return Math.abs(projectile.deltaX) < projectile.width && Math.abs(projectile.deltaY) < projectile.height
    }
    
}